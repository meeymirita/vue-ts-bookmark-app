### Интерфейс 

`Profile, который будет описывает структуру данных, возвращаемых из API`

`TypeScript знает, как выглядит объект профиля`
```ts
import type { Profile } from '@/interfaces/profile.ts'

export interface Profile {
  name: string;
}
```

### Реактивное состояние
```ts
const profile = ref<Profile | undefined>()
```
`profile — реактивная ссылка Profile | undefined значит:
либо объект профиля
либо undefined (пока данные не пришли)`

`Почему undefined? Потому что запрос к API асинхронный, данные появятся позже`


```ts
async function fetchProfileAvatar() {
  const data = await fetch(API_ROUTES.profile);
  
  const res =  (await data.json()) as Profile;
  profile.value = res;
}
```
 - HTTP запрос на: API_ROUTES.profile
```json
{
"name": "Alex"
}
```
`(await data.json()) as Profile -> as Profile гарантирует что это обьект типа Profile`