import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it, beforeEach } from 'vitest'

import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe9@gmail.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe9@gmail.com',
      password: '1234567',
    })

    console.log(user.password_hash)

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able register with same email twice', async () => {
    const email = 'john.doe10@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1234567',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
