import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test bike',
            5678,
            5678,
            100.0,
            'My bike',
            5,
            []
        )

        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedbike = await repo.find(bikeToBePersisted.id)
        expect(persistedbike.name).toEqual(
            bikeToBePersisted.name
        )
    })

    it('removes a bike from the database', async () => {
        const bikeToBePersisted = new Bike(
            'test bike',
            'test bike',
            5678,
            5678,
            100.0,
            'My bike',
            5,
            []
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bikeToBePersisted)
        await repo.remove('5678')
        const removedbike = await repo.find('5678')
        expect(removedbike).toBeNull()
    })

    it('lists users in the database', async () => {
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const bike2 = new Bike('caloi kidbike', 'bike',
        5678, 5678, 98.0, 'Mine', 4, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })

})


