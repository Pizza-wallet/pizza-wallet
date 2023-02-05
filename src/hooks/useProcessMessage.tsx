import type {
  EVMChain,
  Process,
  ProcessType,
  Status,
  StatusMessage,
  Step,
  Substatus,
} from "@lifi/sdk";
import { LifiErrorCode } from "@lifi/sdk";
import { formatTokenAmount } from "../helpers/formatters";
import { useChains } from "./useChains";

export const useProcessMessage = (step?: Step, process?: Process) => {
  // const { t } = useTranslation();
  const { getChainById } = useChains();
  if (!step || !process) {
    return {};
  }
  return getProcessMessage(getChainById, step, process);
};

const processStatusMessages: Record<
  ProcessType,
  Partial<Record<Status, () => string>>
> = {
  TOKEN_ALLOWANCE: {
    STARTED: () => "Token allowance started",
    PENDING: () => "Token allowance pending",
    DONE: () => "Token allowance done",
  },
  SWITCH_CHAIN: {
    ACTION_REQUIRED: () => "Action required - switch chain",
    DONE: () => "Switch chain done",
  },
  SWAP: {
    STARTED: () => "Swap started",
    ACTION_REQUIRED: () => "Swap action required",
    PENDING: () => "Swap pending",
    DONE: () => "Swap done",
  },
  CROSS_CHAIN: {
    STARTED: () => "Cross chain swap started",
    ACTION_REQUIRED: () => "Cross chain action required",
    PENDING: () => "Cross chain pending",
    DONE: () => "Cross chain done",
  },
  RECEIVING_CHAIN: {
    PENDING: () => "Receiving chain pending",
    DONE: () => "Receiving chain done",
  },
  TRANSACTION: {},
};

const processSubstatusMessages: Record<
  StatusMessage,
  Partial<Record<Substatus, () => string>>
> = {
  PENDING: {
    // BRIDGE_NOT_AVAILABLE: 'Bridge communication is temporarily unavailable.',
    // CHAIN_NOT_AVAILABLE: 'RPC communication is temporarily unavailable.',
    // REFUND_IN_PROGRESS:
    //   "The refund has been requested and it's being processed",
    // WAIT_DESTINATION_TRANSACTION:
    //   'The bridge off-chain logic is being executed. Wait for the transaction to appear on the destination chain.',
    // WAIT_SOURCE_CONFIRMATIONS:
    //   'The bridge deposit has been received. The bridge is waiting for more confirmations to start the off-chain logic.',
  },
  DONE: {
    // COMPLETED: 'The transfer is complete.',
    PARTIAL: () => "Receiving chain partial",
    REFUNDED: () => "Receiving chain refunded",
  },
  FAILED: {
    // TODO: should be moved to failed status
    // NOT_PROCESSABLE_REFUND_NEEDED:
    //   'The transfer cannot be completed successfully. A refund operation is required.',
    // UNKNOWN_ERROR:
    //   'An unexpected error occurred. Please seek assistance in the LI.FI discord server.',
  },
  INVALID: {},
  NOT_FOUND: {},
};

export function getProcessMessage(
  getChainById: (chainId: number) => EVMChain | undefined,
  step: Step,
  process: Process,
): {
  title?: string;
  message?: string;
} {
  if (process.error && process.status === "FAILED") {
    const getTransactionNotSentMessage = () => (
      <div>
        <p>Transaction not sent</p>
        <p>
          {formatTokenAmount(
            step.action.fromAmount,
            step.action.fromToken.decimals,
          )}
        </p>
        <p>{step.action.fromToken.symbol}</p>
        <p>{getChainById(step.action.fromChainId)?.name ?? ""}</p>
      </div>
    );
    let title: string = "";
    let message: any = "";
    switch (process.error.code) {
      case LifiErrorCode.BalanceError:
        title = "Balance is too low";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.ChainSwitchError:
        title = "Switch chain";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.GasLimitError:
        title = "Gas limit is too low";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.TransactionFailed:
        title = "Transaction failed";
        message = "transaction failed";
        break;
      case LifiErrorCode.TransactionUnderpriced:
        title = "Transaction underpriced";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.TransactionUnprepared:
        title = "Transaction unprepared";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.TransactionCanceled:
        title = "Transaction canceled";
        message = getTransactionNotSentMessage();
        break;
      case LifiErrorCode.SlippageError:
        title = "Slippage not met";
        message = "Slippage threshold not met";
        break;
      case LifiErrorCode.TransactionRejected:
        title = "Transaction rejected";
        message = (
          <div>
            <p>Transaction rejected</p>
            <p>
              {formatTokenAmount(
                step.action.fromAmount,
                step.action.fromToken.decimals,
              )}
            </p>
            <p>{step.action.fromToken.symbol}</p>
            <p>{getChainById(step.action.fromChainId)?.name ?? ""}</p>
          </div>
        );
        break;
      case LifiErrorCode.ProviderUnavailable:
      default:
        title = "Unknown error";
        if (process.txLink) {
          message = "transaction failed";
        } else {
          message = "Unknown error";
        }
        break;
    }
    return { title, message };
  }
  const title =
    processSubstatusMessages[process.status as StatusMessage]?.[
      process.substatus!
    ]?.() ?? processStatusMessages[process.type]?.[process.status]?.();
  return { title };
}
