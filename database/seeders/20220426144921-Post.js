'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'post',
      [
        {
          id: 1,
          message: 'Reading about Tropicana Crunch.. Dont look it up',
          key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
          signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
          board: 'Home',
          time: '1651680078',
          nickname: 'kryptoknugen',
          tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
          reply: null,
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
        {
          id: 2,
          message: 'Hugin Messenger is freakin awesome',
          key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
          signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
          board: 'Hugin',
          time: '1651680078',
          nickname: 'mjovanc',
          tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
          reply: null,
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
        {
          id: 3,
          message: 'Svelte #ftw',
          key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
          signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
          board: 'Kryptokrona',
          time: '1651680078',
          nickname: 'Swepool',
          tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
          reply: null,
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('post', null, {}),
}
