import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cooperative } from './schemas/cooperative.schema';

@Injectable()
export class CooperativeService {
  getCooperativeLink(id: string, baseUrl: string): string | PromiseLike<string> {
    throw new Error('Method not implemented.');
  }
  updateCooperativeDescription(id: string, description: string): Cooperative | PromiseLike<Cooperative> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Cooperative.name) private cooperativeModel: Model<Cooperative>,
  ) {}

  /**
   * Generate a cooperative link using the format `${baseUrl}/${cooperative}/${cooperative}`
   * @param baseUrl - The base URL of the application
   * @param cooperativeName - The name of the cooperative
   * @returns A string that represents the cooperative link
   */
  
  generateCooperativeLink(baseUrl: string, cooperativeName: string): string {
    // Generate the cooperative link in the format `${baseUrl}/${cooperative}/${cooperative}`
    const formattedName = encodeURIComponent(cooperativeName);  // Ensure URL-safe cooperative name
    const link = `${baseUrl}/${formattedName}/${formattedName}`;
    return link;
  }

  // Example function to create a new cooperative
  async createCooperative(name: string, description: string): Promise<Cooperative> {
    const newCooperative = new this.cooperativeModel({ name, description });
    return newCooperative.save();
  }

  // Example function to get all cooperatives
  async findAll(): Promise<Cooperative[]> {
    return this.cooperativeModel.find().exec();
  }
}
