import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Добро пожаловать в RaceTrack Pro! Я ваш виртуальный помощник. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('трасс') || lowerMessage.includes('track')) {
      return 'У нас есть три премиальных трассы: Art-Americo-2019 (4.2 км, эксперт), Off-Race (3.8 км, продвинутый) и GMX-1 (5.1 км, профессионал). Каждая трасса имеет уникальные характеристики и вызовы!';
    }

    if (lowerMessage.includes('запис') || lowerMessage.includes('бронир') || lowerMessage.includes('время')) {
      return 'Для записи выберите трассу в разделе "Трассы", затем перейдите в "Бронирование", укажите дату и доступное время. Мы работаем с 9:00 до 21:00 ежедневно.';
    }

    if (lowerMessage.includes('цен') || lowerMessage.includes('стоимост') || lowerMessage.includes('сколько')) {
      return 'Стоимость зависит от выбранной трассы и времени:\n• Art-Americo-2019: от 5000₽/час\n• Off-Race: от 4000₽/час\n• GMX-1: от 6000₽/час\nДоступны пакетные предложения и абонементы со скидками до 30%!';
    }

    if (lowerMessage.includes('требован') || lowerMessage.includes('нужно') || lowerMessage.includes('права')) {
      return 'Для участия необходимо: водительские права категории B, возраст от 18 лет, медицинская справка (предоставим на месте). Все защитное снаряжение включено в стоимость.';
    }

    if (lowerMessage.includes('рейтинг') || lowerMessage.includes('лидер') || lowerMessage.includes('чемпион')) {
      return 'Рейтинг обновляется в реальном времени! Лидирует Александр Петров с 2847 очками. Участвуйте в гонках, улучшайте время круга и поднимайтесь в топ!';
    }

    if (lowerMessage.includes('безопасност') || lowerMessage.includes('страховк')) {
      return 'Ваша безопасность — наш приоритет! Мы предоставляем полный комплект защитного снаряжения, профессиональные инструкторы всегда на трассе, а все участники застрахованы.';
    }

    if (lowerMessage.includes('трансляц') || lowerMessage.includes('онлайн') || lowerMessage.includes('смотреть')) {
      return 'Все крупные соревнования транслируются онлайн! Включите трансляцию на главной странице или подпишитесь на уведомления о предстоящих событиях.';
    }

    if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон') || lowerMessage.includes('адрес')) {
      return 'Свяжитесь с нами:\n📞 +7 (495) 123-45-67 (Пн-Вс 9:00-21:00)\n📧 info@racetrack.pro\n📍 Москва, Гоночная ул. 1, Автодром «Профи»';
    }

    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Всегда рад помочь! Если возникнут ещё вопросы — обращайтесь. Удачных гонок! 🏁';
    }

    if (lowerMessage.includes('привет') || lowerMessage.includes('здравств')) {
      return 'Привет! Рад видеть вас в RaceTrack Pro. Готов ответить на любые вопросы о трассах, бронировании или соревнованиях!';
    }

    return 'Спасибо за вопрос! Я могу помочь с информацией о трассах, бронированием, ценами, требованиями для участия и многим другим. Задайте конкретный вопрос, и я с радостью отвечу!';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Как записаться на трассу?',
    'Какие цены?',
    'Что нужно для участия?',
    'Расскажите о трассах'
  ];

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b border-border bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Icon name="Bot" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">Техподдержка RaceTrack Pro</CardTitle>
            <p className="text-sm text-muted-foreground">Обычно отвечаем мгновенно</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback
                    className={message.sender === 'bot' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}
                  >
                    {message.sender === 'bot' ? <Icon name="Bot" size={16} /> : <Icon name="User" size={16} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Icon name="Bot" size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {messages.length <= 1 && (
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-sm text-muted-foreground mb-3">Популярные вопросы:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputValue(question);
                  }}
                  className="justify-start text-left h-auto py-2 px-3"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите ваш вопрос..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
