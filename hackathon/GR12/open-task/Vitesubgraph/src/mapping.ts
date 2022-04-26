import {
  Approval as ApprovalEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent
} from "../generated/Vite/Vite"
import {
  Approval,
  Paused,
  Transfer,
  Unpaused
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let approval = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.value = event.params.value
  approval.save()
}

export function handlePaused(event: PausedEvent): void {
  let paused = new Paused(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  paused.account = event.params.account
  paused.save()
}


export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.params.value
  transfer.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let unpaused = new Unpaused(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  unpaused.account = event.params.account
  unpaused.save()
}
