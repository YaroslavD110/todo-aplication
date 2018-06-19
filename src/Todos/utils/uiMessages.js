import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function errorMessage(text) {
    iziToast.error({
        message: text,
    });
}

export function warningMessage(text) {
    iziToast.warning({
        message: text,
    });
}

export function infoMessage(text) {
    iziToast.info({
        message: text,
    });
}

export function successMessage(text) {
    iziToast.success({
        message: text,
    });
}