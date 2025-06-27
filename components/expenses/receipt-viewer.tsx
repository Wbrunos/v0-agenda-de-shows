"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

interface ReceiptViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receiptUrl: string
  receiptName: string
  expenseDescription: string
}

export function ReceiptViewer({ open, onOpenChange, receiptUrl, receiptName, expenseDescription }: ReceiptViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)
  const handleDownload = () => {
    // TODO: Implement download from Supabase Storage
    const link = document.createElement("a")
    link.href = receiptUrl
    link.download = receiptName
    link.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Comprovante - {expenseDescription}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-slate-300 hover:text-white">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-400">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-slate-300 hover:text-white">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRotate} className="text-slate-300 hover:text-white">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload} className="text-slate-300 hover:text-white">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-slate-900 rounded-lg p-4">
          <div className="flex justify-center">
            <img
              src={receiptUrl || "/placeholder.svg"}
              alt={`Comprovante - ${expenseDescription}`}
              className="max-w-full h-auto transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: "center",
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-slate-400">{receiptName}</div>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <X className="h-4 w-4 mr-2" />
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
