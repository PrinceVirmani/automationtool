import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

const SUPPORTED_ACTIONS = [
  { id: "hyperliquid", title: "Hyperliquid", description: "Trade on Hyperliquid DEX", color: "from-cyan-500 to-blue-500" },
  { id: "lighter", title: "Lighter", description: "Trade on Lighter", color: "from-orange-500 to-red-500" },
  { id: "backpack", title: "Backpack", description: "Trade on Backpack Exchange", color: "from-purple-500 to-pink-500" },
];

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const ActionSheet = ({ onSelect }) => {
  const [open, setOpen] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Create Action
          </SheetTitle>
          <SheetDescription className="text-base">
            Configure your trading action
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Exchange Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Exchange</label>
            <div className="grid gap-3">
              {SUPPORTED_ACTIONS.map(({ id, title, description, color }) => (
                <button
                  key={id}
                  onClick={() => setSelectedAction(id)}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAction === id
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
                    <ArrowRightLeft size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Configuration */}
          <div className="space-y-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            {/* Buy/Sell */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Order Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMetadata((prev) => ({ ...prev, type: "buy" }))}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    metadata?.type === "buy"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setMetadata((prev) => ({ ...prev, type: "sell" }))}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    metadata?.type === "sell"
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            {/* Asset */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Asset</label>
              <Select
                value={metadata?.asset}
                onValueChange={(value) => setMetadata((prev) => ({ ...prev, asset: value }))}
              >
                <SelectTrigger className="bg-white border-green-200">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_ASSETS.map((asset) => (
                      <SelectItem key={asset} value={asset}>
                        {asset}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <Input
                type="number"
                placeholder="e.g., 0.5"
                value={metadata.qty ?? ""}
                onChange={(e) => setMetadata((prev) => ({ ...prev, qty: e.target.value }))}
                className="bg-white border-green-200 focus:border-green-400"
              />
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metadata);
              setOpen(false);
            }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6"
            disabled={!metadata.type || !metadata.asset || !metadata.qty}
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};