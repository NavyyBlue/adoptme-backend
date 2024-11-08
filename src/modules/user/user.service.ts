import { FirebaseAdmin } from '@data/firebase/firebase.setup';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly admin: FirebaseAdmin,
    private configService: ConfigService,
  ) {}

  async createUser(userRequest: UserDto): Promise<any> {
    const {
      email,
      password,
      firstName,
      lastName,
      studentCode,
      phone,
      permissions,
    } = userRequest;
    const app = this.admin.setup();

    try {
      // Phone number format
      const countryCode = '+51';
      let formattedPhone = phone;
      if (!phone.startsWith(countryCode)) {
        formattedPhone = `${countryCode}${phone}`;
      }

      // Create user
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
        phoneNumber: formattedPhone,
        emailVerified: false,
      });      

      // Set custom claims
      await app.auth().setCustomUserClaims(createdUser.uid, { permissions });

      // Iniciar sesión con el nuevo usuario para obtener el token ID
      // const auth = getAuth();
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const idToken = await userCredential.user.getIdToken();

      // Enviar correo de verificación personalizado
      // await this.sendCustomVerificationEmail(idToken);

      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.code);
    }
  }

  private async sendCustomVerificationEmail(idToken: string): Promise<void> {
    const apiKey = this.configService.get<string>('FIREBASE_API_KEY');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

    const data = {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken,
    };

    try {
      await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new BadRequestException('Error sending verification email');
    }
  }
}
