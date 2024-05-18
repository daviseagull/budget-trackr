import { accountRepository } from '../repositories/account.repository'

export const accountUtils = {
  verifyIfExistsByDescription: async (
    description: string,
    userId: string
  ): Promise<boolean> => {
    const exists = await accountRepository.getOneByDescription(
      description,
      userId
    )

    return exists ? true : false
  },

  verifyIfExistsById: async (
    accountId: string,
    userId: string
  ): Promise<boolean> => {
    const exists = await accountRepository.getOneById(accountId, userId)

    return exists ? true : false
  },
}
