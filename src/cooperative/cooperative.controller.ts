import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { CooperativeService } from './cooperative.service';
import { Cooperative } from './schemas/cooperative.schema';

@Controller('cooperatives')
export class CooperativeController {
  constructor(private readonly cooperativeService: CooperativeService) {}

  /**
   * Endpoint to generate a cooperative link.
   * Calls the CooperativeService.getCooperativeLink() method
   * @param id - The ID of the cooperative
   * @returns The generated cooperative link
   */
  @Get(':id/link')
  async getCooperativeLink(@Param('id') id: string): Promise<string> {
    const baseUrl = 'https://example.com';  // Replace with your actual base URL
    return this.cooperativeService.getCooperativeLink(id, baseUrl);
  }

  /**
   * Endpoint to update the description of a cooperative.
   * Calls the CooperativeService.updateCooperativeDescription() method
   * @param id - The ID of the cooperative
   * @param body - The body containing the new description
   * @returns The updated cooperative
   */
  @Patch(':id/description')
  async updateCooperativeDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Promise<Cooperative> {
    return this.cooperativeService.updateCooperativeDescription(id, description);
  }
}
