import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"

interface TriggerDrawerProps {
  trigger: React.ReactNode
  title: string
  description: React.ReactNode
  children?: React.ReactNode
}

export const TriggerDrawer = ({trigger, title, description, children}: TriggerDrawerProps) => {
  return (
    <Drawer>
  <DrawerTrigger asChild>
    {trigger}
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
     <div className="text-center space-y-3">
        <DrawerTitle className="font-LinkSansBold">{title}</DrawerTitle>
      </div>
      <div>
        {description}
      </div>

      {children}
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
        <Button>Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}
