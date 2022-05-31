import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { GameCreateDto } from './modules/games/dtos/game-create.dto';
import { GameFindManyRequestDto } from './modules/games/dtos/game-find-many-request.dto';
import { GameResponseDto } from './modules/games/dtos/game-response.dto';
import { GameUpdateDto } from './modules/games/dtos/game-update.dto';
import { IsGameExistsPipe } from './modules/games/interceptors/is-game-exists.pipe';
import { GamesMutationService } from './modules/games/services/games-mutation/games-mutation.service';
import { GamesQueryService } from './modules/games/services/games-query/games-query.service';
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
  findAllPaginated(
    @Query() filters: GameFindManyRequestDto,
  ): Promise<PaginatedResponse<GameResponseDto>> {
    return this.gamesQueryService.findAllPaginated(filters);
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
  @UsePipes(IsGameExistsPipe)
  updateOne(
    @Param() id: number,
    @Body() dto: GameUpdateDto,
  ): Promise<GameResponseDto> {
    return this.gamesMutationService.updateOne(id, dto);
  }

  @Delete(':id')
  @UsePipes(IsGameExistsPipe)
  async deleteOne(@Param() id: number): Promise<OkResponse> {
    await this.gamesMutationService.deleteOne(id);
    return new OkResponse();
  }
}
