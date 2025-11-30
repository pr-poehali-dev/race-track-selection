import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeSection, setActiveSection] = useState('tracks');

  const tracks = [
    {
      id: 1,
      name: 'Art-Americo-2019',
      difficulty: 'Expert',
      length: '4.2 км',
      turns: 18,
      record: '1:42.351',
      available: true,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Off-Race',
      difficulty: 'Advanced',
      length: '3.8 км',
      turns: 14,
      record: '1:38.122',
      available: true,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'GMX-1',
      difficulty: 'Professional',
      length: '5.1 км',
      turns: 22,
      record: '1:55.847',
      available: true,
      image: '/placeholder.svg'
    }
  ];

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: false },
    { time: '15:00', available: true },
    { time: '17:00', available: true },
    { time: '19:00', available: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'Александр Петров', time: '1:38.122', points: 2847, avatar: '/placeholder.svg' },
    { rank: 2, name: 'Михаил Иванов', time: '1:39.451', points: 2765, avatar: '/placeholder.svg' },
    { rank: 3, name: 'Дмитрий Сидоров', time: '1:40.892', points: 2698, avatar: '/placeholder.svg' },
    { rank: 4, name: 'Сергей Козлов', time: '1:42.234', points: 2543, avatar: '/placeholder.svg' },
    { rank: 5, name: 'Андрей Морозов', time: '1:43.567', points: 2487, avatar: '/placeholder.svg' }
  ];

  const gallery = [
    { id: 1, title: 'Победный финиш', image: '/placeholder.svg' },
    { id: 2, title: 'Трасса GMX-1', image: '/placeholder.svg' },
    { id: 3, title: 'Подиум чемпионов', image: '/placeholder.svg' },
    { id: 4, title: 'Вечерние гонки', image: '/placeholder.svg' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Trophy" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">RaceTrack Pro</h1>
          </div>
          <div className="hidden md:flex gap-6">
            {['Главная', 'Трассы', 'Расписание', 'Рейтинг', 'Галерея', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <Badge className="mb-4 bg-secondary text-secondary-foreground text-sm px-4 py-2">
            Премиум гоночные трассы
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Испытайте скорость
            <br />
            <span className="text-primary">мирового класса</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Три легендарные трассы. Профессиональное оборудование. Незабываемые эмоции.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Icon name="Calendar" size={20} className="mr-2" />
              Забронировать заезд
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть трансляцию
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Выберите трассу</h3>
            <p className="text-muted-foreground text-lg">Каждая трасса — уникальный вызов для настоящих гонщиков</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <Card
                key={track.id}
                className={`overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                  selectedTrack === track.name ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedTrack(track.name)}
              >
                <div className="relative h-48 bg-muted">
                  <img src={track.image} alt={track.name} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {track.difficulty}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{track.name}</CardTitle>
                  <CardDescription className="text-base">Рекорд трассы: {track.record}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Route" size={18} className="text-primary" />
                      <span className="text-sm">{track.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="RotateCw" size={18} className="text-primary" />
                      <span className="text-sm">{track.turns} поворотов</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="booking" className="text-base">Бронирование</TabsTrigger>
              <TabsTrigger value="schedule" className="text-base">Расписание</TabsTrigger>
            </TabsList>
            <TabsContent value="booking" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Выберите дату</CardTitle>
                    <CardDescription>Доступные дни выделены</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Доступное время</CardTitle>
                    <CardDescription>
                      {selectedDate?.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={slot.available ? 'outline' : 'secondary'}
                          disabled={!slot.available}
                          className="h-16 text-lg font-semibold border-2"
                        >
                          <Icon name="Clock" size={18} className="mr-2" />
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
                      <Icon name="CheckCircle" size={20} className="mr-2" />
                      Подтвердить запись
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="schedule">
              <Card className="max-w-5xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Расписание мероприятий</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '15 декабря', event: 'Чемпионат Off-Race', time: '14:00' },
                      { date: '18 декабря', event: 'Открытая тренировка GMX-1', time: '10:00' },
                      { date: '22 декабря', event: 'Турнир Art-Americo-2019', time: '16:00' }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border-2 border-border rounded-lg hover:border-primary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Icon name="CalendarDays" size={24} className="text-primary" />
                          <div>
                            <p className="font-semibold text-lg">{item.event}</p>
                            <p className="text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <Badge className="bg-secondary text-secondary-foreground text-base px-4 py-2">
                          {item.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Рейтинг гонщиков</h3>
            <p className="text-muted-foreground text-lg">Топ-5 лучших пилотов этого сезона</p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              {leaderboard.map((racer, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-6 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                    index === 0 ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                        index === 0
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {racer.rank}
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarImage src={racer.avatar} />
                      <AvatarFallback>{racer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{racer.name}</p>
                      <p className="text-muted-foreground">Лучшее время: {racer.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{racer.points}</p>
                    <p className="text-sm text-muted-foreground">очков</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Фотогалерея</h3>
            <p className="text-muted-foreground text-lg">Лучшие моменты наших гонок</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((photo) => (
              <Card key={photo.id} className="overflow-hidden group cursor-pointer">
                <div className="relative h-64 bg-muted">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-foreground font-semibold p-4">{photo.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">О нас</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: 'Award',
                title: 'Профессиональные трассы',
                description: 'Сертифицированные международные треки с современным покрытием'
              },
              {
                icon: 'Shield',
                title: 'Безопасность',
                description: 'Полное снаряжение и страховка для каждого участника'
              },
              {
                icon: 'Users',
                title: 'Опытные инструкторы',
                description: 'Команда профессиональных тренеров с опытом более 10 лет'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Контакты</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-base">
                Свяжитесь с нами для бронирования или консультации
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Icon name="Phone" size={32} className="mx-auto mb-2" />
                  <p className="font-semibold">+7 (495) 123-45-67</p>
                  <p className="text-sm text-primary-foreground/80">Пн-Вс 9:00-21:00</p>
                </div>
                <div>
                  <Icon name="Mail" size={32} className="mx-auto mb-2" />
                  <p className="font-semibold">info@racetrack.pro</p>
                  <p className="text-sm text-primary-foreground/80">Ответим в течение часа</p>
                </div>
                <div>
                  <Icon name="MapPin" size={32} className="mx-auto mb-2" />
                  <p className="font-semibold">Москва, Гоночная ул. 1</p>
                  <p className="text-sm text-primary-foreground/80">Автодром «Профи»</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 RaceTrack Pro. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
