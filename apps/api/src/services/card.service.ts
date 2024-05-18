import {
  CardDto,
  CardDtoSchema,
  CreateCardRequest,
  CreateResourceResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { cardRepository } from '../repositories/card.repository'

export const cardService = {
  create: async (
    data: CreateCardRequest,
    userId: string
  ): Promise<CreateResourceResponse> => {
    const isAlreadyCreated = await cardRepository.getOneByDescription(
      data.name,
      userId
    )

    if (isAlreadyCreated) {
      throw new createHttpError.BadRequest(
        `Card with the name ${data.name} already exists`
      )
    }

    const card = await cardRepository.create(data, userId)

    return { id: card.id }
  },

  getAll: async (userId: string): Promise<CardDto[]> => {
    return await cardRepository.getAll(userId)
  },

  getOne: async (userId: string, CardId: string): Promise<CardDto> => {
    const Card = await cardRepository.getOneById(userId, CardId)
    if (!Card) {
      throw new createHttpError.BadRequest(`Card ${CardId} not found`)
    }
    return CardDtoSchema.parse(Card)
  },
}
