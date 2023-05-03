toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  showDuration: '100',
  hideDuration: '1000',
  timeOut: '2000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

/**
 * Display toast popup
 * @param {string} type - Type of toast
 * @param {string} message - Message for toast
 * @param {string} [position = toast-top-right] - Position of toast
 * @example
 * displayToast('success','Success message')
 * displayToast('error','Error message','toast-bottom-full-width')
 * displayToast('warning','Warning message','toast-top-left')
 * displayToast('info','Info message','toast-top-full-width')
 */
function displayToast(type, message, position) {
  toastr.options.positionClass = position || 'toast-top-right';
  const title = type[0].toUpperCase() + type.substring(1);
  toastr[type](message, title);
}
