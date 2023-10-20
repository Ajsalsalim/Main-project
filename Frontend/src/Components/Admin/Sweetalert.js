import Swal from 'sweetalert2';

const Sweetalert = {
  success: (title, text) => Swal.fire({ icon: 'success', title, text }),
  error: (title, text) => Swal.fire({ icon: 'error', title, text }),
  confirm: (title, text) => Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }),
};

export default Sweetalert;