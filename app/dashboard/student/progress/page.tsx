import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Camera, Calendar, Weight, Ruler, Target } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function StudentProgressPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: measurements } = await supabase
    .from("body_measurements")
    .select("*")
    .eq("user_id", user.id)
    .order("measured_at", { ascending: true })

  const { data: sessions } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("started_at", { ascending: true })

  const { data: photos } = await supabase
    .from("progress_photos")
    .select("*")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: false })

  const weightData =
    measurements?.slice(-6).map((m) => ({
      date: new Date(m.measured_at).toLocaleDateString("pt-BR", { month: "short" }),
      weight: m.weight_kg || 0,
    })) || []

  const workoutData =
    sessions?.slice(-4).map((s, i) => ({
      week: `Sem ${i + 1}`,
      workouts: 1,
    })) || []

  const latestMeasurement = measurements?.[measurements.length - 1]
  const firstMeasurement = measurements?.[0]

  const measurementStats = [
    {
      name: "Peso",
      current: latestMeasurement?.weight_kg ? `${latestMeasurement.weight_kg}kg` : "N/A",
      previous: firstMeasurement?.weight_kg ? `${firstMeasurement.weight_kg}kg` : "N/A",
      change:
        latestMeasurement?.weight_kg && firstMeasurement?.weight_kg
          ? `${(latestMeasurement.weight_kg - firstMeasurement.weight_kg).toFixed(1)}kg`
          : "0kg",
      icon: Weight,
    },
    {
      name: "Cintura",
      current: latestMeasurement?.waist_cm ? `${latestMeasurement.waist_cm}cm` : "N/A",
      previous: firstMeasurement?.waist_cm ? `${firstMeasurement.waist_cm}cm` : "N/A",
      change:
        latestMeasurement?.waist_cm && firstMeasurement?.waist_cm
          ? `${(latestMeasurement.waist_cm - firstMeasurement.waist_cm).toFixed(1)}cm`
          : "0cm",
      icon: Ruler,
    },
    {
      name: "Peito",
      current: latestMeasurement?.chest_cm ? `${latestMeasurement.chest_cm}cm` : "N/A",
      previous: firstMeasurement?.chest_cm ? `${firstMeasurement.chest_cm}cm` : "N/A",
      change:
        latestMeasurement?.chest_cm && firstMeasurement?.chest_cm
          ? `${(latestMeasurement.chest_cm - firstMeasurement.chest_cm).toFixed(1)}cm`
          : "0cm",
      icon: Target,
    },
  ]

  const progressPhotos =
    photos?.map((p) => ({
      date: new Date(p.taken_at).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      image: p.photo_url,
    })) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-balance">Seu Progresso</h2>
          <p className="text-muted-foreground">Acompanhe sua evolução e conquistas</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Camera className="h-4 w-4 mr-2" />
          Nova Foto
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="measurements">Medidas</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {measurementStats.map((item) => (
              <Card key={item.name} className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.current}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={item.change.startsWith("-") ? "default" : "secondary"} className="text-xs">
                      {item.change}
                    </Badge>
                    <p className="text-xs text-muted-foreground">desde {item.previous}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Evolução de Peso</CardTitle>
                <CardDescription>Últimos registros</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    weight: {
                      label: "Peso (kg)",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="var(--color-weight)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-weight)", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Treinos Completados</CardTitle>
                <CardDescription>Últimas sessões</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    workouts: {
                      label: "Treinos",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workoutData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="week" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="workouts" fill="var(--color-workouts)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Metas do Mês</CardTitle>
              <CardDescription>Junho 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Treinos Completados</span>
                  <span className="font-bold">16/20</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Perda de Peso</span>
                  <span className="font-bold">1.5kg/2kg</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Dias Consecutivos</span>
                  <span className="font-bold">12/15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="measurements" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Histórico de Medidas</CardTitle>
              <CardDescription>Todas as suas medições corporais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {measurements && measurements.length > 0 ? (
                  measurements
                    .slice(-10)
                    .reverse()
                    .map((measurement) => (
                      <div
                        key={measurement.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                      >
                        <div className="flex items-center gap-4">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-semibold">
                              {new Date(measurement.measured_at).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="text-sm text-muted-foreground">Avaliação física</p>
                          </div>
                        </div>
                        <div className="flex gap-6 text-sm">
                          {measurement.weight_kg && (
                            <div>
                              <p className="text-muted-foreground">Peso</p>
                              <p className="font-bold">{measurement.weight_kg}kg</p>
                            </div>
                          )}
                          {measurement.chest_cm && (
                            <div>
                              <p className="text-muted-foreground">Peito</p>
                              <p className="font-bold">{measurement.chest_cm}cm</p>
                            </div>
                          )}
                          {measurement.waist_cm && (
                            <div>
                              <p className="text-muted-foreground">Cintura</p>
                              <p className="font-bold">{measurement.waist_cm}cm</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">Nenhuma medição registrada ainda</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Fotos de Progresso</CardTitle>
              <CardDescription>Compare sua evolução visual ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              {progressPhotos.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {progressPhotos.map((photo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden border-2 border-border/50">
                        <img
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.date}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-sm font-semibold text-center">{photo.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Nenhuma foto de progresso ainda</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
