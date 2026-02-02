import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TriggerDialogProps {
  trigger: React.ReactNode
  title: string
  description?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const TriggerDialog = ({ trigger, title, description, children, open, onOpenChange }: TriggerDialogProps) => {
  const isTextDescription = typeof description === 'string' || typeof description === 'number'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        <div className="flex justify-around">

          <DialogTitle className="font-LinkSansBold">{title}</DialogTitle>
        </div>
        {description && (
          isTextDescription ? (
            <DialogDescription>
              {description}
            </DialogDescription>
          ) : (
            <div className="text-sm text-muted-foreground">{description}</div>
          )
        )}
        {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
