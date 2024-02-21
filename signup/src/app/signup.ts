import { Injectable } from '@nestjs/common';

// Напишіть два мікросервіси:
//     Перший (REST Nest.js, Prisma) для реєстрації користувачів.
//     Коли новий користувач реєструється, відправте user.created event через sqs,
//     Зберіть prometheus histogram метрику по часу виконання запита на реєстрацію
//
//     Другий (Nest.js)
//     Отримайте цей евент та відправте apple push notification.
//     Організуйте можливість затримати обробку евенту консюмером зі допомогою передачі  X-Delay заголовка в кожному евенті на X мілісекунд.

interface SignupInput {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
}

@Injectable()
export class Signup {
  constructor() {}

  async execute(input: SignupInput) {}
}
