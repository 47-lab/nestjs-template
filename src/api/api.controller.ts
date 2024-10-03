import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCredential, ApiService } from './api.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class CreateApiCredentialDto {
  @ApiProperty()
  userId: string;
}

class GetTokenDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  clientSecret: string;
}

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('api')
  public async createApiCredential(
    @Body()
    body: CreateApiCredentialDto,
  ): Promise<ApiCredential> {
    const { userId } = body;
    return this.apiService.createApiCredential(userId);
  }

  @Post('token')
  @ApiTags('api')
  public async getToken(
    @Body() body: GetTokenDto,
  ): Promise<{ access_token: string }> {
    const { clientId, clientSecret } = body;
    const access_token = await this.apiService.getToken(clientId, clientSecret);
    return {
      access_token,
    };
  }
}
