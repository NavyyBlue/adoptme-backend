import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesRequestDto } from './dto/preferences.request.dto';
import { Auth } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PreferencesResponseDto } from './dto/preferences.response.dto';

@ApiBearerAuth()
@Auth()
@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  @ApiResponse({ status: 200, type: PreferencesResponseDto })
  async getPreferences(@Req() req) {
    const userId = req.user.uid;
    return this.preferencesService.getPreferences(userId);
  }

  @Post()
  @ApiBody({ type: PreferencesRequestDto })
  async createPreferences(
    @Body() preferencesData: Partial<PreferencesRequestDto>,
    @Req() req,
  ) {
    const userId = req.user.uid;
    return this.preferencesService.createPreferences(userId, preferencesData);
  }
 
  @Put()
  async updatePreferences(
    @Body() preferencesData: Partial<PreferencesRequestDto>,
    @Req() req,
  ) {
    const userId = req.user.uid;
    return this.preferencesService.updatePreferences(userId, preferencesData);
  }

  @Delete()
  async removePreferences(@Req() req) {
    const userId = req.user.uid;
    return this.preferencesService.removePreferences(userId);
  }
}
