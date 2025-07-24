import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Car {
  id: number;
  name: string;
  category: string;
  speed: number;
  price: string;
  image: string;
  screenshots: string[];
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Pegassi Zentorno',
    category: 'Super',
    speed: 95,
    price: '$725,000',
    image: '/img/4885d627-3400-4fcc-9d14-a01652810dc7.jpg',
    screenshots: ['/img/4885d627-3400-4fcc-9d14-a01652810dc7.jpg']
  },
  {
    id: 2,
    name: 'Nagasaki Shotaro',
    category: 'Motorcycles',
    speed: 87,
    price: '$2,225,000',
    image: '/img/a62fa869-8828-4267-a88a-08b4f5a34a33.jpg',
    screenshots: ['/img/a62fa869-8828-4267-a88a-08b4f5a34a33.jpg']
  },
  {
    id: 3,
    name: 'Pfister 811',
    category: 'Super',
    speed: 92,
    price: '$1,135,000',
    image: '/img/d1694a46-956a-484e-8ba2-b608dbe44e81.jpg',
    screenshots: ['/img/d1694a46-956a-484e-8ba2-b608dbe44e81.jpg']
  }
];

const categories = ['Все', 'Super', 'Sports', 'Motorcycles', 'Off-Road'];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carsList, setCarsList] = useState<Car[]>(cars);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    name: '',
    category: '',
    speed: 0,
    price: '',
    image: ''
  });

  const filteredCars = carsList.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cyberpunk-dark text-white">
      {/* Header */}
      <header className="border-b border-neon-cyan/20 bg-cyberpunk-darker/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-cyber font-bold text-neon-cyan neon-text animate-glow">
            GTA 5 CAR CATALOG
          </h1>
          <p className="text-gray-400 mt-2">Изучай автомобили из мира Grand Theft Auto V</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-cyber text-neon-cyan">Поиск и фильтры</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-neon-green text-cyberpunk-dark hover:bg-neon-green/80 transition-colors">
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Добавить авто
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-cyberpunk-gray border-neon-cyan neon-border text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-neon-cyan font-cyber">Добавить новый автомобиль</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Заполните информацию о новом автомобиле
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-gray-300">Название</Label>
                    <Input
                      id="name"
                      value={newCar.name}
                      onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                      className="bg-cyberpunk-dark border-neon-cyan/30 text-white mt-1"
                      placeholder="Pegassi Zentorno"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-sm text-gray-300">Категория</Label>
                    <Select value={newCar.category} onValueChange={(value) => setNewCar({...newCar, category: value})}>
                      <SelectTrigger className="bg-cyberpunk-dark border-neon-cyan/30 text-white mt-1">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyberpunk-gray border-neon-cyan/30">
                        <SelectItem value="Super">Super</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Motorcycles">Motorcycles</SelectItem>
                        <SelectItem value="Off-Road">Off-Road</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="speed" className="text-sm text-gray-300">Максимальная скорость</Label>
                    <Input
                      id="speed"
                      type="number"
                      value={newCar.speed}
                      onChange={(e) => setNewCar({...newCar, speed: parseInt(e.target.value) || 0})}
                      className="bg-cyberpunk-dark border-neon-cyan/30 text-white mt-1"
                      placeholder="95"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-sm text-gray-300">Цена</Label>
                    <Input
                      id="price"
                      value={newCar.price}
                      onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                      className="bg-cyberpunk-dark border-neon-cyan/30 text-white mt-1"
                      placeholder="$725,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image" className="text-sm text-gray-300">URL изображения</Label>
                    <Input
                      id="image"
                      value={newCar.image}
                      onChange={(e) => setNewCar({...newCar, image: e.target.value})}
                      className="bg-cyberpunk-dark border-neon-cyan/30 text-white mt-1"
                      placeholder="https://example.com/car.jpg"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={() => {
                      if (newCar.name && newCar.category && newCar.price) {
                        const newCarWithId: Car = {
                          id: carsList.length + 1,
                          name: newCar.name,
                          category: newCar.category,
                          speed: newCar.speed,
                          price: newCar.price,
                          image: newCar.image || '/placeholder.svg',
                          screenshots: [newCar.image || '/placeholder.svg']
                        };
                        setCarsList([...carsList, newCarWithId]);
                        setNewCar({ name: '', category: '', speed: 0, price: '', image: '' });
                        setIsAddDialogOpen(false);
                      }
                    }}
                    className="flex-1 bg-neon-cyan text-cyberpunk-dark hover:bg-neon-cyan/80"
                  >
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-3 h-4 w-4 text-neon-cyan" />
            <Input
              placeholder="Поиск автомобилей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cyberpunk-gray border-neon-cyan/30 text-white placeholder:text-gray-400 focus:border-neon-cyan neon-border"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? 'bg-neon-purple text-white shadow-neon-purple'
                    : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card 
              key={car.id} 
              className="bg-cyberpunk-gray border-neon-cyan/30 neon-border hover:shadow-neon-cyan transition-all duration-500 cursor-pointer group"
              onClick={() => setSelectedCar(car)}
            >
              <CardHeader className="pb-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyberpunk-dark/80 to-transparent" />
                  <Badge className="absolute top-2 right-2 bg-neon-purple text-white">
                    {car.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-neon-cyan mb-2">{car.name}</CardTitle>
                <CardDescription className="text-gray-300 mb-4">
                  Скорость: {car.speed}/100
                </CardDescription>
                <div className="flex justify-between items-center">
                  <span className="text-neon-green font-bold text-lg">{car.price}</span>
                  <Button 
                    size="sm" 
                    className="bg-neon-cyan text-cyberpunk-dark hover:bg-neon-cyan/80 transition-colors"
                  >
                    <Icon name="Eye" className="w-4 h-4 mr-1" />
                    Детали
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Car Details Modal */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-cyberpunk-gray border-neon-cyan neon-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-cyber font-bold text-neon-cyan neon-text">
                    {selectedCar.name}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCar(null)}
                    className="text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Категория:</span>
                      <Badge className="ml-2 bg-neon-purple">{selectedCar.category}</Badge>
                    </div>
                    <div>
                      <span className="text-gray-400">Цена:</span>
                      <span className="ml-2 text-neon-green font-bold">{selectedCar.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Скорость:</span>
                      <span className="ml-2 text-white">{selectedCar.speed}/100</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neon-cyan mb-2">Галерея</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedCar.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`${selectedCar.name} screenshot ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg border border-neon-cyan/30"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-cyberpunk-gray border-neon-cyan/30 neon-border text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-cyber font-bold text-neon-cyan neon-text">
                {carsList.length}
              </div>
              <p className="text-gray-400">Автомобилей в каталоге</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyberpunk-gray border-neon-purple/30 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-cyber font-bold text-neon-purple neon-text">
                {categories.length - 1}
              </div>
              <p className="text-gray-400">Категорий транспорта</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyberpunk-gray border-neon-green/30 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-cyber font-bold text-neon-green neon-text">
                24/7
              </div>
              <p className="text-gray-400">Доступность каталога</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;