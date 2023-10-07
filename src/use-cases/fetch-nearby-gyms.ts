import { Gym } from '@prisma/client'

import { GymsRepository } from './../repositories/gyms-repository'

interface FetchNearbyByUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyByUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyByUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyByUseCaseRequest): Promise<FetchNearbyByUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
