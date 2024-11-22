import { Auth } from '@guards/auth.decorator';
import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
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
}
