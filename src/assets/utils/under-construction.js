import Swal from "sweetalert2";

export default function underConstruction(e, msg) {
    msg = msg || 'Sorry, this feature is not available at this time.'
    e.preventDefault();
    Swal.fire({
        title: 'Under Construction!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK'
    })
}
