// gadingpro-admin/src/MyNotification.jsx (Versi Final yang 100% Benar)
import { useEffect } from 'react';
// 1. Impor HANYA useNotificationContext
import { useNotificationContext } from 'react-admin'; 
import { toast } from 'sonner';

const MyNotification = () => {
    // 2. Ambil `notifications` dan `removeNotification` dari satu hook yang sama
    const { notifications, removeNotification } = useNotificationContext();

    useEffect(() => {
        // Logika ini tetap sama
        const notification = notifications[notifications.length - 1];

        if (notification) {
            switch (notification.type) {
                case 'success':
                    toast.success(notification.message, notification.notificationOptions);
                    break;
                case 'warning':
                    toast.warning(notification.message, notification.notificationOptions);
                    break;
                case 'info':
                    toast.info(notification.message, notification.notificationOptions);
                    break;
                default:
                    toast.error(notification.message || 'An error occurred', notification.notificationOptions);
                    break;
            }
            // 3. Panggil fungsi removeNotification yang didapat dari context
            removeNotification(notification);
        }
    }, [notifications, removeNotification]);

    return null; 
};

export default MyNotification;