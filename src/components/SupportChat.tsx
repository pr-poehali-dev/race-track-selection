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

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://functions.poehali.dev/06a3dff4-1b28-4d7f-b7a3-9dfb2244c4f8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.response || 'Извините, не удалось получить ответ. Пожалуйста, попробуйте еще раз.';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Извините, произошла ошибка. Пожалуйста, свяжитесь с нами по телефону +7 (495) 123-45-67';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const messageText = inputValue;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const aiResponseText = await getBotResponse(messageText);
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Какие у вас трассы и их характеристики?',
    'Сколько стоит час гонок?',
    'С какого возраста можно участвовать?',
    'Насколько это опасно?',
    'Что нужно для записи?',
    'Есть ли ограничения по здоровью?'
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