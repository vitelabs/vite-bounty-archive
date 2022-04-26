import { computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'
import { required, minLength, sameAs, between } from '@vuelidate/validators'
import {
  validatePrivateKey,
  validateMnemonic,
  isValidAddress
} from '../../services/AccountService'
import { createFromPrivateKey } from '../../services/AccountService'

export function useValidate(state: any) {
  const store = useStore()

  const createPasswordRules = computed(() => {
    const localRules = {
      password: { required, minLength: minLength(8) },
      repeatPassword: {
        required,
        sameAs: sameAs(state.password)
      }
    }

    return localRules
  })

  const cpV$: any = useVuelidate(createPasswordRules, state)
  const passwordErrors = computed(() => {
    const errors = []
    if (cpV$.value.password.$dirty) {
      if (!cpV$.value.password.required.$response) {
        errors.push('This filed is required')
      } else if (!cpV$.value.password.minLength.$response) {
        errors.push('Min length 8 characters')
      }
    }
    return errors
  })

  const repeatPasswordErrors = computed(() => {
    const errors = []
    if (cpV$.value.repeatPassword.$dirty) {
      if (!cpV$.value.repeatPassword.required.$response) {
        errors.push('This filed is required')
      } else if (!cpV$.value.repeatPassword.sameAs.$response) {
        errors.push('Password mismatch')
      }
    }
    return errors
  })

  const originPassword = computed(() => store.getters['settings/password'])
  const lockRules = computed(() => {
    const localRules = {
      password: {
        required,
        sameAs: sameAs(originPassword.value)
      }
    }

    return localRules
  })
  const lV$: any = useVuelidate(lockRules, state)
  const unLockErrors = computed(() => {
    const errors = []
    if (lV$.value.password.$dirty) {
      if (!lV$.value.password.required.$response) {
        errors.push('This filed is required')
      } else if (!lV$.value.password.sameAs.$response) {
        errors.push('Wrong password')
      }
    }
    return errors
  })

  const confirmMnemonicRules = computed(() => {
    const localRules = {
      mnemonicForConfirm: {
        required,
        sameAs: sameAs(state.mnemonic)
      }
    }

    return localRules
  })
  const CMV$: any = useVuelidate(confirmMnemonicRules, state)
  const confrimMnemonicErrors = computed(() => {
    const errors = []
    if (CMV$.value.mnemonicForConfirm.$dirty) {
      if (!CMV$.value.mnemonicForConfirm.required.$response) {
        errors.push('This filed is required')
      } else if (!CMV$.value.mnemonicForConfirm.sameAs.$response) {
        errors.push('Incorrect words or words order')
      }
    }
    return errors
  })

  const requiedRule = computed(() => {
    const localRules = {
      validator: {
        required
      }
    }

    return localRules
  })
  const requiedV$: any = useVuelidate(requiedRule, state)
  const requiedError = computed(() => {
    const errors = []
    if (requiedV$.value.validator.$dirty) {
      if (!requiedV$.value.validator.required.$response) {
        errors.push('This filed is required')
      }
    }
    return errors
  })

  const accounts = computed(() => store.getters['wallets/accounts'])

  const validPrivateKey = (key) => !!validatePrivateKey(key)
  const validMnemonic = (value) => !!validateMnemonic(value)
  const uniqueAccount = (value) => {
    const account = createFromPrivateKey(value)
    let uniqueAccount = true
    accounts.value.forEach((acc) => {
      if (acc.address === account.address) {
        uniqueAccount = false
      }
    })
    return uniqueAccount
  }
  const inputType = (value) => value.includes('Mnemonic')
  const importTextareaRules = computed(() => {
    const localRules = {
      validator: {
        required,
        validPrivateKey,
        validMnemonic,
        uniqueAccount
      },
      type: {
        inputType
      }
    }

    return localRules
  })
  const importTextareaV$: any = useVuelidate(importTextareaRules, state)
  const importTextareaError = computed(() => {
    const errors = []
    if (importTextareaV$.value.validator.$dirty) {
      if (!importTextareaV$.value.validator.required.$response) {
        errors.push('This filed is required')
      } else if (
        !importTextareaV$.value.validator.validPrivateKey.$response &&
        !importTextareaV$.value.type.inputType.$response
      ) {
        errors.push('Invalid private key')
      } else if (
        !importTextareaV$.value.validator.validMnemonic.$response &&
        importTextareaV$.value.type.inputType.$response
      ) {
        errors.push('Invalid mnemonic')
      } else if (
        importTextareaV$.value.validator.validPrivateKey.$response &&
        !importTextareaV$.value.validator.uniqueAccount.$response &&
        !importTextareaV$.value.type.inputType.$response
      ) {
        errors.push('Already added')
      }
    }
    return errors
  })
  const validAddress = (address: string) => !!isValidAddress(address)
  const zero = (value: number) => value > 0

  const sendInputRules = computed(() => {
    const localRules = {
      addressInput: {
        required,
        validAddress
      },
      amountInput: {
        required,
        betweenRef: between(0, state.balance),
        zero
      },
      tokenSelect: {
        required
      }
    }

    return localRules
  })
  const sendInputV$: any = useVuelidate(sendInputRules, state)
  const addressInputError = computed(() => {
    const errors = []
    if (sendInputV$.value.addressInput.$dirty) {
      if (!sendInputV$.value.addressInput.required.$response) {
        errors.push('This filed is required')
      } else if (!sendInputV$.value.addressInput.validAddress.$response) {
        errors.push('Invalid address')
      }
    }
    return errors
  })
  const tokenSelectError = computed(() => {
    const errors = []
    if (sendInputV$.value.tokenSelect.$dirty) {
      if (!sendInputV$.value.tokenSelect.required.$response) {
        errors.push('This filed is required')
      }
    }
    return errors
  })
  const amountInputError = computed(() => {
    const errors = []
    if (sendInputV$.value.amountInput.$dirty) {
      if (!sendInputV$.value.amountInput.required.$response) {
        errors.push('This filed is required')
      } else if (
        !sendInputV$.value.amountInput.betweenRef.$response &&
        sendInputV$.value.amountInput.zero.$response
      ) {
        errors.push('Insufficient balance')
      } else if (!sendInputV$.value.amountInput.zero.$response) {
        errors.push('The amount must be greater than zero.')
      }
    }
    return errors
  })

  return {
    cpV$,
    passwordErrors,
    repeatPasswordErrors,
    lV$,
    unLockErrors,
    CMV$,
    confrimMnemonicErrors,
    requiedV$,
    requiedError,
    importTextareaV$,
    importTextareaError,
    sendInputV$,
    addressInputError,
    amountInputError,
    tokenSelectError
  }
}
