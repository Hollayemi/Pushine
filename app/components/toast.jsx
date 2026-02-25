'use client'
import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react'

const Toast = ({ show, message, type, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    if (!show) return null

    const getToastConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-500',
                    textColor: 'text-white',
                }
            case 'error':
                return {
                    icon: XCircle,
                    bgColor: 'bg-red-500',
                    textColor: 'text-white',
                }
            case 'warning':
                return {
                    icon: AlertCircle,
                    bgColor: 'bg-yellow-500',
                    textColor: 'text-white',
                }
            default:
                return {
                    icon: Info,
                    bgColor: 'bg-blue-500',
                    textColor: 'text-white',
                }
        }
    }

    const { icon: Icon, bgColor, textColor } = getToastConfig()

    return (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
            <div className={`${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm`}>
                <Icon className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium flex-1">{message}</p>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 hover:opacity-70 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

export default Toast