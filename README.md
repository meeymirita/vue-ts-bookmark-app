### Интерфейс 

`ProfileInterface, который будет описывает структуру данных, возвращаемых из API`

`TypeScript знает, как выглядит объект профиля`
```ts
import type { ProfileInterface } from '@/interfaces/profile.interface.ts'

export interface ProfileInterface {
  name: string;
}
```

### Реактивное состояние
```ts
const profile = ref<ProfileInterface | undefined>()
```
`profile — реактивная ссылка ProfileInterface | undefined значит:
либо объект профиля
либо undefined (пока данные не пришли)`

`Почему undefined? Потому что запрос к API асинхронный, данные появятся позже`


```ts
async function fetchProfileAvatar() {
  const data = await fetch(API_ROUTES.profile);
  
  const res =  (await data.json()) as ProfileInterface;
  profile.value = res;
}
```
 - HTTP запрос на: API_ROUTES.profile
```json
{
"name": "Alex"
}
```
`(await data.json()) as ProfileInterface -> as ProfileInterface гарантирует что это обьект типа ProfileInterface`


### Экземпляр Axios

- Документация:
- https://axios-http.com/docs/instance

- Создание общего HTTP-клиента для работы с API:

```ts
import axios from 'axios';

export const API_ROUTES = {
profile: 'profile',
};

export const httpClient = axios.create({
baseURL: 'http://localhost:3000/api/',
timeout: 10000,
});
```
`Пример использования`
- Вызов httpClient с дженериком ProfileInterface, чтобы тип данных соответствовал ответу сервера:

```ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProfileInterface } from '@/interfaces/profile.interface.ts';
import { API_ROUTES, httpClient } from '@/api/api.ts';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileInterface>();

  async function fetchProfileAvatar() {
    const { data } = await httpClient.get<ProfileInterface>(API_ROUTES.profile);
    profile.value = data;
  }

  return { profile, fetchProfileAvatar };
});

```
### Vue Router
#### Описывает:
- path — URL
- component — какой компонент рендерить
- name — (необязательно) имя маршрута

```ts
{
  path: '/',
  component: () => import('@/Views/AuthView.vue'),
}
```

#### Вложенные маршруты (children)
#### Используются, когда:

- есть общий layout
- внутри него меняется контент

```ts
{
  path: '/main',
  component: () => import('@/Views/MainView.vue'),
  children: [
    { path: '', component: MainHomeView },
    { path: 'new', component: MainNewView },
  ],
}
```
`Как это работает`
- /main → MainView + пустой child
- /main/new → MainView + MainNewView


#### Динамические маршруты (dynamic routes)

`Используются для:`
- профилей
- страниц по id
- детальных страниц

```ts
{
  path: '/category/:id',
  component: () => import('@/Views/CategoryView.vue'),
}
```
`Получение параметра`
```ts
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
```

#### Именованные маршруты (name)

`Позволяют не писать path руками:`
- { path: '/main', name: 'main', component: MainView }
- 
`Переход:`
- router.push({ name: 'main' });
- 
`С параметрами:`
- router.push({ name: 'category', params: { id: 3 } });

`Итоги`
- children → вложенные страницы
- path: '' → дефолтный child
- :id → динамический маршрут
- <router-view /> → место, куда рендерится child
- name → лучший способ навигации