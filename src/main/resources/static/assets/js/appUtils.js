class AppUtils {
    static showSuccess = (text) => {
        $.toast({
            heading: 'Success',
            text: text,
            showHideTransition: 'slide',
            icon: 'success',
            position: 'top-right',
        })
    }

    static showError = (text) => {
        $.toast({
            heading: 'Error',
            text: text,
            showHideTransition: 'fade',
            icon: 'error',
            position: 'top-right',
        })
    }
}