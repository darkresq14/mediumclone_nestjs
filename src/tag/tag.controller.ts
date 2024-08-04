import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllTagsDto } from './dto/findAllTags.dto';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: 'Get all tags' })
  @Get()
  async findAll(): Promise<FindAllTagsDto> {
    const tags = await this.tagService.findAll();
    return { tags: tags.map((tag) => tag.name) };
  }
}
