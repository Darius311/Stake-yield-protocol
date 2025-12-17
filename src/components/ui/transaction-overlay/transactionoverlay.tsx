import { useEffect } from "react";
import { DialogRoot, DialogContent, DialogBody, DialogBackdrop } from "@chakra-ui/react"
import { VStack, Text } from "@chakra-ui/react"
import Lottie from "lottie-react"
import loadingAnim from "../../../assets/animations/loading.json" // Check path
import successAnim from "../../../assets/animations/success.json" // Check path
import Card from '../../card/card';

type OverlayProps = {
  isOpen: boolean;        
  isPending: boolean;
  isSuccess: boolean;
  onClose: () => void;    
}

export default function TransactionOverlay({ isOpen, isPending, isSuccess, onClose }: OverlayProps) {
  
  // LOGIC: The Timer
  useEffect(() => {
    if (isSuccess && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isOpen, onClose]);

  // ANIMATION SELECTION
  const currentAnimation = isSuccess ? successAnim : loadingAnim;
  const message = isSuccess ? "Transaction Confirmed!" : "Processing Transaction...";

  return (
    <DialogRoot open={isOpen} placement="center" closeOnInteractOutside={false}>
      <DialogBackdrop css={{ bg: "blackAlpha.400" }} />
      
      {/* Centering Fix */}
      <DialogContent 
        bg="transparent" 
        boxShadow="none"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        margin={0}
      >
        <DialogBody>
          <Card
            classname="default"
            title={
              <VStack gap={1}>
                <Lottie 
                  animationData={currentAnimation} 
                  loop={isPending} 
                  style={{ height: 120, width: 120 }} 
                />
              </VStack>
            }
            content={
              <Text color="black" fontSize="2xl" fontWeight="bold" textAlign="center">
                {message}
              </Text>
            }
          />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
