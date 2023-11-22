class AppUtils {
    // static showSuccess = (text) => {
    //     $.toast({
    //         heading: 'Success',
    //         text: text,
    //         showHideTransition: 'slide',
    //         icon: 'success',
    //         position: 'top-right',
    //         delay: 150000,
    //     })
    // }


    static showSuccess = (text) => {
        $.toast({
            title: 'Notice!',
            content: text,
            type: 'success',
            delay: 2000,
            dismissible: true,
        });
    }

    static showError = (text) => {
        $.toast({
            title: 'Notice!',
            content: text,
            type: 'error',
            delay: 2000,
            dismissible: true,
        });
    }

    // static showError = (text) => {
    //     $.toast({
    //         heading: 'Error',
    //         text: text,
    //         showHideTransition: 'fade',
    //         icon: 'error',
    //         position: 'top-right',
    //     })
    // }
}