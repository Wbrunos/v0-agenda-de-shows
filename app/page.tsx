"use client"

import { useState } from "react"
import { Calendar, Music, Users, TrendingUp, Plus, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShowCalendar } from "@/components/show-calendar"
import { ShowList } from "@/components/show-list"
import { AddShowDialog } from "@/components/add-show-dialog"
import { DayShowsDialog } from "@/components/day-shows-dialog"

// Dados de exemplo
const mockShows = [
  {
    id: 1,
    title: "Rock in Rio 2024",
    artist: "Coldplay",
    date: "2024-09-15",
    time: "20:00",
    venue: "Cidade do Rock",
    city: "Rio de Janeiro",
    status: "confirmed",
    price: "R$ 350,00",
    capacity: 100000,
    sold: 85000,
    observation: "Show principal do festival com fogos de artifício",
  },
  {
    id: 2,
    title: "Turnê Acústica",
    artist: "Ed Sheeran",
    date: "2024-07-20",
    time: "19:30",
    venue: "Allianz Parque",
    city: "São Paulo",
    status: "confirmed",
    price: "R$ 280,00",
    capacity: 55000,
    sold: 55000,
    observation: "Show intimista com violão e piano",
  },
  {
    id: 3,
    title: "Festival de Verão",
    artist: "Anitta",
    date: "2024-08-10",
    time: "21:00",
    venue: "Arena Fonte Nova",
    city: "Salvador",
    status: "pending",
    price: "R$ 180,00",
    capacity: 50000,
    sold: 32000,
    observation: "Show com participações especiais",
  },
  {
    id: 4,
    title: "Show Intimista",
    artist: "Marisa Monte",
    date: "2024-07-05",
    time: "20:30",
    venue: "Teatro Municipal",
    city: "São Paulo",
    status: "confirmed",
    price: "R$ 120,00",
    capacity: 1500,
    sold: 1200,
    observation: "Repertório especial com clássicos da MPB",
  },
  {
    id: 5,
    title: "Rock Nacional",
    artist: "Legião Urbana Tributo",
    date: "2024-07-20",
    time: "22:00",
    venue: "Espaço das Américas",
    city: "São Paulo",
    status: "confirmed",
    price: "R$ 80,00",
    capacity: 8000,
    sold: 6500,
    observation: "Tributo oficial com músicos originais",
  },
]

const mockArtists = [
  { id: 1, name: "Coldplay", genre: "Rock Alternativo", country: "Reino Unido" },
  { id: 2, name: "Ed Sheeran", genre: "Pop", country: "Reino Unido" },
  { id: 3, name: "Anitta", genre: "Pop/Funk", country: "Brasil" },
  { id: 4, name: "Marisa Monte", genre: "MPB", country: "Brasil" },
  { id: 5, name: "Legião Urbana Tributo", genre: "Rock Nacional", country: "Brasil" },
]

export default function Dashboard() {
  const [shows, setShows] = useState(mockShows)
  const [artists, setArtists] = useState(mockArtists)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isDayShowsOpen, setIsDayShowsOpen] = useState(false)

  const totalShows = shows.length
  const confirmedShows = shows.filter((show) => show.status === "confirmed").length
  const totalRevenue = shows.reduce((acc, show) => {
    const price = Number.parseFloat(show.price.replace("R$ ", "").replace(",", ""))
    return acc + price * show.sold
  }, 0)

  const handleAddShow = (newShow: any) => {
    const show = {
      ...newShow,
      id: shows.length + 1,
    }
    setShows([...shows, show])
  }

  const handleAddArtist = (newArtist: any) => {
    const artist = {
      ...newArtist,
      id: artists.length + 1,
    }
    setArtists([...artists, artist])
  }

  const filteredShows = shows.filter((show) => {
    const matchesSearch =
      show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesArtist = selectedArtist === "all" || show.artist === selectedArtist

    return matchesSearch && matchesArtist
  })

  const uniqueArtists = [...new Set(shows.map((show) => show.artist))]

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    setIsDayShowsOpen(true)
  }

  const getShowsForDate = (date: string) => {
    return shows.filter((show) => show.date === date)
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/95 backdrop-blur supports-[backdrop-filter]:bg-slate-800/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Music className="mr-2 h-6 w-6 text-blue-400 animate-pulse-glow" />
            <span className="font-bold text-xl text-white">ShowManager</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar shows, artistas ou cidades..."
                  className="pl-8 md:w-[300px] lg:w-[400px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Filtrar por artista" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">
                    Todos os artistas
                  </SelectItem>
                  {uniqueArtists.map((artist) => (
                    <SelectItem key={artist} value={artist} className="text-white">
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4 animate-bounce-slow" />
              Novo Show
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-effect border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total de Shows</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400 animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalShows}</div>
              <p className="text-xs text-slate-400">{confirmedShows} confirmados</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Receita Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400 animate-pulse-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ {(totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-slate-400">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Artistas Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-400 animate-rotate-slow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{uniqueArtists.length}</div>
              <p className="text-xs text-slate-400">Artistas com shows agendados</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="shows" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="shows" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Shows
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Calendário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shows" className="space-y-4">
            <ShowList
              shows={filteredShows}
              onUpdateShow={(updatedShow) => {
                setShows(shows.map((show) => (show.id === updatedShow.id ? updatedShow : show)))
              }}
            />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <ShowCalendar shows={filteredShows} onDateClick={handleDateClick} />
          </TabsContent>
        </Tabs>
      </main>

      <AddShowDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddShow={handleAddShow}
        artists={artists}
      />

      {selectedDate && (
        <DayShowsDialog
          open={isDayShowsOpen}
          onOpenChange={setIsDayShowsOpen}
          date={selectedDate}
          shows={getShowsForDate(selectedDate)}
        />
      )}
    </div>
  )
}
