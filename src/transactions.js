//in order to do the date sorting, the date format had to be manually changed
//originally the date format was dd/mm/yyyy, this is invalid in js
//the new date format is yyyy/mm/dd

const transactions = [
  { amount: 112.98, date: '2018-01-27T12:34', card_last_four: '2544' },
  { amount: 0.45, date: '2017-12-01T09:36', card_last_four: '4434' },
  { amount: 95.99, date: '2017-11-23T14:34', card_last_four: '3011' },
  { amount: 7774.32, date: '2017-07-17T03:34', card_last_four: '6051' },
  { amount: 1345.98, date: '2017-06-22T10:33', card_last_four: '0059' },
  { amount: 2850.70, date: '2018-01-27T12:34', card_last_four: '4444' },
  { amount: 45.00, date: '2018-02-10T02:34', card_last_four: '0110' },
  { amount: 1.00, date: '2018-02-17T18:34', card_last_four: '1669' },
  { amount: 4.69, date: '2018-02-01T02:34', card_last_four: '8488' },
  { amount: 1111.11, date: '2018-01-15T21:34', card_last_four: '9912' }
]

export default transactions;