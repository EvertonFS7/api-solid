import { Gym } from '@prisma/client'

import { GymsRepository } from './../repositories/gyms-repository'

interface FetchNearbyByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyByGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyByGymsUseCaseRequest): Promise<FetchNearbyByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
