import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { GameCreateDto } from './modules/games/dtos/game-create.dto';
import { GameFindManyRequestDto } from './modules/games/dtos/game-find-many-request.dto';
import { GameResponseDto } from './modules/games/dtos/game-response.dto';
import { GameUpdateDto } from './modules/games/dtos/game-update.dto';
import { GamesMutationService } from './modules/games/services/games-mutation.service';
import { GamesQueryService } from './modules/games/services/games-query.service';
import { PublisherResponseDto } from './modules/publisher/dtos/publisher-response.dto';
import { PublisherQueryService } from './modules/publisher/services/publisher-query.service';
import { PaginatedResponse } from './shared/generics/paginated-response.generic';

@Controller({ version: 'v1' })
export class AppController {
  constructor(
    private readonly gamesMutationService: GamesMutationService,
    private readonly gamesQueryService: GamesQueryService,
    private readonly publisherQueryService: PublisherQueryService,
  ) {}

  @Get()
  findMany(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    filters: GameFindManyRequestDto,
  ): Promise<PaginatedResponse<GameResponseDto>> {
    return this.gamesQueryService.findManyPaginated(filters);
  }

  @Get(':id')
  getOneById(@Param('id') id: number): Promise<GameResponseDto> {
    return this.gamesQueryService.getOneById(id);
  }

  @Get(':id/publisher')
  getGamePublisherById(@Param('id') id: number): Promise<PublisherResponseDto> {
    return this.publisherQueryService.getOneByGameId(id);
  }

  @Post()
  createOne(@Body() dto: GameCreateDto): Promise<GameResponseDto> {
    return this.gamesMutationService.createOne(dto);
  }

  @Patch(':id')
  updateOne(
    @Param() id: number,
    @Body() dto: GameUpdateDto,
  ): Promise<GameResponseDto> {
    return this.gamesMutationService.updateOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param() id: number): Promise<OkResponse> {
    await this.gamesMutationService.deleteOne(id);
    return new OkResponse();
  }
}
