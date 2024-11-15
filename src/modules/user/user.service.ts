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

  
}
