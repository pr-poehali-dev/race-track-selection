import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI-powered chat support for RaceTrack Pro with OpenAI GPT-4
    Args: event - dict with httpMethod, body containing user message
          context - object with request_id attribute
    Returns: HTTP response with AI-generated answer
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        from openai import OpenAI
    except ImportError:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': 'Извините, система ИИ временно недоступна. Пожалуйста, свяжитесь с нами по телефону +7 (495) 123-45-67'
            }),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    if not body_str or body_str == '':
        body_str = '{}'
    body_data = json.loads(body_str)
    user_message: str = body_data.get('message', '')
    
    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': 'Извините, система ИИ настраивается. Пожалуйста, позвоните нам: +7 (495) 123-45-67'
            }),
            'isBase64Encoded': False
        }
    
    client = OpenAI(api_key=api_key)
    
    system_prompt = """Ты - профессиональный ассистент техподдержки гоночного комплекса RaceTrack Pro. 
Отвечай дружелюбно, профессионально и по делу на русском языке.

ИНФОРМАЦИЯ О ТРАССАХ:
1. Art-Americo-2019
   - Длина: 4.2 км
   - Сложность: Expert (эксперт)
   - Поворотов: 18
   - Рекорд трассы: 1:42.351
   - Цена: от 5000₽/час
   - Особенности: Технически сложная трасса с крутыми виражами, требует высокого мастерства

2. Off-Race
   - Длина: 3.8 км
   - Сложность: Advanced (продвинутый)
   - Поворотов: 14
   - Рекорд трассы: 1:38.122
   - Цена: от 4000₽/час
   - Особенности: Универсальная трасса, подходит для обучения и соревнований

3. GMX-1
   - Длина: 5.1 км
   - Сложность: Professional (профессионал)
   - Поворотов: 22
   - Рекорд трассы: 1:55.847
   - Цена: от 6000₽/час
   - Особенности: Самая длинная и сложная трасса, используется для профессиональных чемпионатов

ТРЕБОВАНИЯ ДЛЯ УЧАСТИЯ:
- Возраст: от 18 лет (для детей 14-17 лет - специальные программы с инструктором)
- Водительские права: категория B (обязательно)
- Медицинская справка: предоставляется на месте бесплатно
- Опыт вождения: минимум 1 год для трасс Expert и Professional
- Физическая подготовка: базовый уровень, без серьезных проблем со здоровьем

БЕЗОПАСНОСТЬ:
- Все защитное снаряжение включено: шлем, комбинезон, перчатки, защита шеи
- Профессиональные инструкторы всегда на трассе
- Медицинский персонал на объекте 24/7
- Полная страховка всех участников
- Современные системы безопасности на всех автомобилях
- Опасность: средний уровень при соблюдении правил, инструктаж обязателен

ОПАСНОСТЬ И РИСКИ:
- При соблюдении инструкций риск минимален
- За 10 лет работы 0 серьезных инцидентов
- Обязательный инструктаж по технике безопасности
- Ограничение скорости для новичков
- Система экстренной остановки на всех трассах

ВОЗРАСТНЫЕ КАТЕГОРИИ:
- 14-17 лет: только с родителями, специальные карты, максимум Off-Race
- 18-25 лет: все трассы, страховка с повышенным тарифом
- 25-60 лет: стандартные условия, все трассы
- 60+: медосмотр обязателен, рекомендация врача

ЦЕНЫ И АБОНЕМЕНТЫ:
- Разовый заезд: 4000-6000₽/час в зависимости от трассы
- Абонемент 5 часов: скидка 15%
- Абонемент 10 часов: скидка 25%
- Абонемент 20 часов: скидка 30%
- Корпоративные мероприятия: индивидуальный расчет
- Аренда всей трассы: от 50000₽/час

БРОНИРОВАНИЕ:
- Онлайн на сайте: выбрать трассу → дату → время
- По телефону: +7 (495) 123-45-67 (ежедневно 9:00-21:00)
- Доступные слоты: каждые 2 часа с 9:00 до 21:00
- Отмена бронирования: бесплатно за 24 часа
- Предоплата: 50% при бронировании

КОНТАКТЫ:
- Телефон: +7 (495) 123-45-67 (Пн-Вс 9:00-21:00)
- Email: info@racetrack.pro
- Адрес: Москва, Гоночная ул. 1, Автодром «Профи»
- Время работы: ежедневно 9:00-21:00

РЕЙТИНГ:
- Обновляется в реальном времени после каждого заезда
- Лидер: Александр Петров (2847 очков, лучшее время 1:38.122)
- Система начисления: за время круга, участие в турнирах, постоянство

Если не знаешь точного ответа - честно скажи об этом и предложи связаться с менеджером."""

    try:
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': ai_response,
                'request_id': context.request_id
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': f'Извините, произошла ошибка. Пожалуйста, позвоните нам: +7 (495) 123-45-67. Детали: {str(e)}'
            }),
            'isBase64Encoded': False
        }