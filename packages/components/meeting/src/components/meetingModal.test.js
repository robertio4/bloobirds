import { calculateCollisions } from '../utils/calendar.utils';

const events = [
  {
    duration: 15,
    id: '3kc9nawgir89iezxhwsuwpqvh_20220815T070000Z',
    startTimeTimestamp: 1660546800000,
    endTimeTimestamp: 1660547700000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
  {
    duration: 15,
    id: 'ay50znx8xplp4f7s3i3g57h74_20220815T071500Z',
    startTimeTimestamp: 1660547700000,
    endTimeTimestamp: 1660548600000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
];

const eventsCollisioned = [
  {
    duration: 15,
    id: '3kc9nawgir89iezxhwsuwpqvh_20220815T070000Z',
    startTime: '2022-08-15T07:00:00Z',
    endTime: '2022-08-15T07:15:00Z',
    startTimeTimestamp: 1660539600,
    endTimeTimestamp: 1660540500,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
  {
    duration: 15,
    id: 'ay50znx8xplp4f7s3i3g57h74_20220815T071500Z',
    startTime: '2022-08-15T07:15:00Z',
    endTime: '2022-08-15T07:30:00Z',
    startTimeTimestamp: 1660540500,
    endTimeTimestamp: 1660541400,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
  {
    duration: 15,
    id: '6ynnatrenj91bnrraz5ky15bk_20220815T070000Z',
    startTime: '2022-08-15T07:00:00Z',
    endTime: '2022-08-15T07:15:00Z',
    startTimeTimestamp: 1660539600,
    endTimeTimestamp: 1660540500,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
  {
    duration: 15,
    id: 'cp672851ed1byb6ncz7e9r5jx_20220815T071500Z',
    startTime: '2022-08-15T07:15:00Z',
    endTime: '2022-08-15T07:30:00Z',
    startTimeTimestamp: 1660540500,
    endTimeTimestamp: 1660541400,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-08-15',
  },
];

const finalBoss = [
  {
    duration: 510,
    id: '1yxus9nygzktb67srzh8fhpp2',
    title: '5',
    startTime: '2022-09-15T06:30:00Z',
    endTime: '2022-09-15T15:00:00Z',
    startTimeTimestamp: 1663223400000,
    endTimeTimestamp: 1663254000000,
    participants: [],
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <alfonso.trocoli@bloobirds.com>',
  },
  {
    duration: 150,
    id: 'bcrgg5ogevfbx8uxdsre33tc4',
    title: '3',
    startTime: '2022-09-15T11:45:00Z',
    endTime: '2022-09-15T14:15:00Z',
    startTimeTimestamp: 1663242300000,
    endTimeTimestamp: 1663251300000,
    participants: [],
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <alfonso.trocoli@bloobirds.com>',
  },
  {
    duration: 120,
    id: 'ahmffkmpm40u9kn75ow1sb7ms',
    title: '1',
    startTime: '2022-09-15T08:30:00Z',
    endTime: '2022-09-15T10:30:00Z',
    startTimeTimestamp: 1663230600000,
    endTimeTimestamp: 1663237800000,
    participants: [],
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <alfonso.trocoli@bloobirds.com>',
  },
  {
    duration: 120,
    id: 'cz2mhq6yjt7f0tk12fsqcef4t',
    title: '2',
    startTime: '2022-09-15T09:15:00Z',
    endTime: '2022-09-15T11:15:00Z',
    startTimeTimestamp: 1663233300000,
    endTimeTimestamp: 1663240500000,
    participants: [],
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <alfonso.trocoli@bloobirds.com>',
  },
  {
    duration: 105,
    id: 'iqrgigi96hscv0w6hubda47y',
    title: '4',
    startTime: '2022-09-15T07:30:00Z',
    endTime: '2022-09-15T09:15:00Z',
    startTimeTimestamp: 1663227000000,
    endTimeTimestamp: 1663233300000,
    participants: [],
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <alfonso.trocoli@bloobirds.com>',
  },
  {
    duration: 60,
    id: '15wo00r1hmjbbodo7xahak0gp',
    title: 'Pizza Day',
    startTime: '2022-09-15T12:15:00Z',
    endTime: '2022-09-15T13:15:00Z',
    startTimeTimestamp: 1663244100000,
    endTimeTimestamp: 1663247700000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <sandra@bloobirds.com>',
  },
  {
    duration: 15,
    id: 'fkj9qqt9r67y44wxzoccn48w_20220915T070000Z',
    title: 'Daily',
    startTime: '2022-09-15T07:00:00Z',
    endTime: '2022-09-15T07:15:00Z',
    startTimeTimestamp: 1663225200000,
    endTimeTimestamp: 1663226100000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <earranz@bloobirds.com>',
  },
  {
    duration: 15,
    id: 'bxogpmxrx0q24dh5b974hfxo_20220915T071500Z',
    title: 'Product daily',
    startTime: '2022-09-15T07:15:00Z',
    endTime: '2022-09-15T07:30:00Z',
    startTimeTimestamp: 1663226100000,
    endTimeTimestamp: 1663227000000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <igarcia@bloobirds.com>',
  },
  {
    duration: 15,
    id: '58jp8rkn8y8f64zfydwjbrsqu_20220915T073000Z',
    title: 'Daily IT, CS, Prod, Sup',
    startTime: '2022-09-15T07:30:00Z',
    endTime: '2022-09-15T07:45:00Z',
    startTimeTimestamp: 1663227000000,
    endTimeTimestamp: 1663227900000,
    collisions: 0,
    collisionNumber: 0,
    day: '2022-09-15',
    type: 'nylas',
    calendarId: '1074ag1hrks03o06b2rw9yhkf',
    backgroundColor: 'verySoftBloobirds',
    barColor: 'softBloobirds',
    owner: ' <gblasco@bloobirds.com>',
  },
];

describe('meeting modal testing collisions', () => {
  test('2 events', () => {
    const result = calculateCollisions(events);

    //Daily
    expect(result[0]?.collisions).toBe(0);
    expect(result[0]?.collisionNumber).toBe(0);
    // Product daily
    expect(result[1]?.collisions).toBe(0);
    expect(result[1]?.collisionNumber).toBe(0);
  });

  test('4 events', () => {
    const result = calculateCollisions(eventsCollisioned);

    //Daily
    expect(result[0]?.collisions).toBe(1);
    expect(result[0]?.collisionNumber).toBe(0);
    // Product daily
    expect(result[1]?.collisions).toBe(1);
    expect(result[1]?.collisionNumber).toBe(0);
    //Daily
    expect(result[2]?.collisions).toBe(1);
    expect(result[2]?.collisionNumber).toBe(1);
    // Product daily
    expect(result[3]?.collisions).toBe(1);
    expect(result[3]?.collisionNumber).toBe(1);
  });

  // Our brain does not arrive to solve this test
  test('final boss', () => {
    const result = calculateCollisions(finalBoss);

    //5
    expect(result[0]?.collisions).toBe(8);
    expect(result[0]?.collisionNumber).toBe(0);

    //3
    expect(result[1]?.collisions).toBe(2);
    expect(result[1]?.collisionNumber).toBe(1);

    //1
    expect(result[2]?.collisions).toBe(3);
    expect(result[2]?.collisionNumber).toBe(1);

    //2
    expect(result[3]?.collisions).toBe(2);
    expect(result[3]?.collisionNumber).toBe(2);

    //4
    expect(result[4]?.collisions).toBe(3);
    expect(result[4]?.collisionNumber).toBe(2);

    //Pizza day
    expect(result[5]?.collisions).toBe(2);
    expect(result[5]?.collisionNumber).toBe(2);

    //Daily
    expect(result[6]?.collisions).toBe(1);
    expect(result[6]?.collisionNumber).toBe(1);

    //Product daily
    expect(result[7]?.collisions).toBe(1);
    expect(result[7]?.collisionNumber).toBe(1);

    //Daily IT, CS, Prod, Sup
    expect(result[8]?.collisions).toBe(2);
    expect(result[8]?.collisionNumber).toBe(2);
  });
});
