import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JS GYM',
      description: null,
      phone: '',
      longitude: -48.9371036,
      latitude: -16.2872526,
    })

    await gymsRepository.create({
      title: 'TS GYM',
      description: null,
      phone: '',
      longitude: -48.9371036,
      latitude: -16.2872526,
    })

    const { gyms } = await sut.execute({
      query: 'JS GYM',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS GYM' })])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS GYM ${i}`,
        description: null,
        phone: '',
        longitude: -48.9371036,
        latitude: -16.2872526,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS GYM 21' }),
      expect.objectContaining({ title: 'JS GYM 22' }),
    ])
  })
})
