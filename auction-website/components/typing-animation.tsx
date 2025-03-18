"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  delayBeforeDelete?: number
  delayBeforeType?: number
  className?: string
}

export default function TypingAnimation({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeType = 500,
  className = "",
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (currentIndex < text.length) {
        // Still typing
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, typingSpeed)
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBeforeDelete)
      }
    } else {
      if (displayText.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, deletingSpeed)
      } else {
        // Finished deleting, wait before typing again
        timeout = setTimeout(() => {
          setIsTyping(true)
          setCurrentIndex(0)
        }, delayBeforeType)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delayBeforeDelete, delayBeforeType, deletingSpeed, displayText, isTyping, text, typingSpeed])

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {displayText}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" aria-hidden="true"></span>
    </span>
  )
}

