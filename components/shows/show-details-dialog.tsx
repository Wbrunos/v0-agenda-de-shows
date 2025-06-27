"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Music, DollarSign, FileText, Edit } from "lucide-react"

interface Show {
  id: number
  title: string
  artist: string
  artistId: number
  date: string
  time: string
  venue: string
  city: string
  status: string
  price?: string
  description?: string
}

interface ShowDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  show: Show
}

export function ShowDetailsDialog({ open, onOpenChange, show }: ShowDetailsDialogProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "pending":
        return "Pending"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Music className="h-6 w-6 text-blue-600" />
            {show.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{show.artist}</h3>
            <Badge className={`${getStatusColor(show.status)} border`}>{getStatusText(show.status)}</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">{formatDate(show.date)}</div>
                <div className="text-sm text-gray-500">Show Date</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">{show.time}</div>
                <div className="text-sm text-gray-500">Start Time</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium">{show.venue}</div>
                <div className="text-sm text-gray-500">{show.city}</div>
              </div>
            </div>

            {show.price && (
              <div className="flex items-center gap-3 text-gray-700">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-medium">{show.price}</div>
                  <div className="text-sm text-gray-500">Ticket Price</div>
                </div>
              </div>
            )}

            {show.description && (
              <div className="flex items-start gap-3 text-gray-700">
                <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Description</div>
                  <div className="text-sm text-gray-600 leading-relaxed">{show.description}</div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit Show
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
