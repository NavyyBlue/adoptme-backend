import { Auth } from '@guards/auth.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserProfileDto } from './dto/user-profile.dto';
import { CreateUserProfilePayload } from './payload/create-user-profile.payload';
import { UpdateUserProfilePayload } from './payload/update-user-profile.payload';
import { UserService } from './user.service';
import { StudentCodePayload } from './payload/student-code.payload';
import { StudentEmailPayload } from './payload/student-email.payload';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: UserProfileDto })
  async getUserProfile(@Req() req) {
    const userId = req.user.uid;
    return this.userService.getUserProfile(userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user data' })
  @ApiResponse({ status: 200, type: UserProfileDto })
  async getUserData(@Param('userId') userId: string) {
    return this.userService.getUserProfile(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({ type: CreateUserProfilePayload })
  async createUserProfile(@Body() payload: Partial<CreateUserProfilePayload>) {
    return this.userService.createUserProfile(payload);
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserProfilePayload })
  async updateUserProfile(
    @Body() payload: Partial<UpdateUserProfilePayload>,
    @Req() req,
  ) {
    const userId = req.user.uid;
    return this.userService.updateUserProfile(userId, payload);
  }

  @Delete()
  @Auth()
  @ApiOperation({ summary: 'Delete user profile' })
  async deleteUserProfile(@Req() req) {
    const userId = req.user.uid;
    return this.userService.deleteUserProfile(userId);
  }

  @Post('verify-code')
  @Auth()
  @ApiOperation({ summary: 'Get student data by code' })
  async studenDataByCode(@Body() student: StudentCodePayload) {
    return await this.userService.studentDataByCode(student.code);
  }

  @Post('/verify-email')  
  @ApiOperation({ summary: 'Get student data by email' })
  async validateStudentEmail(@Body() student: StudentEmailPayload) {
    return await this.userService.validateStudentEmail(student.email);
  }
}
