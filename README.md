# Плагин для jQuery с функционалом "бегунка" (слайдера)

[Демо](https://syuzi22.github.io/jquery-slider/)

Задание FSD на позицию Frontend Developer.

## Цель - получить:

- Базовые навыки проектирования (ООП, MVC)
- Навыки по созданию библиотек с удобным API
- Навыки разделения конфигурирования и бизнес-логики
- Умение документировать свой продукт
- Навыки автоматического unit-тестирования

## Требования - плагин должен:

- Иметь удобное API
- Уметь работать независимо
- Быть максимально кастомизируемым, позволять настраивать:
    * Минимальное, максимальное, текущее значение
    * Размер шага
    * Вертикальный/горизонтальный вид
    * Одиночное значение/Интервал
    * Возможность на лету менять значение "снаружи"
    * Возможность включать/отключать значение над бегунком
    * Шкала значений
    * Прогресс-бар
    * Отзывчивость
- Быть четко разделенным на слои:
    * Слой управления данными (Model), который будет содержать бизнес-логику
    * Слой для управления отображением (View) — здесь нельзя проводить никаких расчетов, относящихся к бизнес-логике.
    * Слой для обновления модели и отображения (Controller или Presenter). Он будет:
        * реагировать на сообщения от отображения о действиях пользователей и обновлять модель;
        * реагировать на сообщения об обновлении модели и обновлять отображение.
- Архитектура приложения должна быть задокументирована
- Приложение должно быть покрыто тестами
