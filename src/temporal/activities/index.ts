import{ slotRegeneration, type host_slotGeneration} from "../../services/slot.service.js";

export async function regenerateHostSlotActivity(input: host_slotGeneration) {
    await slotRegeneration(input);
}