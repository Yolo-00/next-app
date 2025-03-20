import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@example.com',
            posts: {
                create: [
                    { title: 'First Post', content: 'Hello World!', published: true },
                    { title: 'Second Post', content: 'Prisma is awesome!', published: false },
                ],
            },
        },
    });

    console.log('🌱 Seed data created');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
