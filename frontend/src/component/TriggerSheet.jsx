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
import { Clock, TrendingUp } from "lucide-react";

const SUPPORTED_TRIGGERS = [
  { id: "timer", title: "Timer", icon: Clock, description: "Execute on a schedule" },
  { id: "price-trigger", title: "Price Trigger", icon: TrendingUp, description: "Trigger when price hits target" },
];

export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const TriggerSheet = ({ onSelect }) => {
  const [open, setOpen] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [selectedTrigger, setSelectedTrigger] = useState("timer");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Trigger
          </SheetTitle>
          <SheetDescription className="text-base">
            Define when your workflow should execute
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Trigger Type Cards */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Trigger Type</label>
            <div className="grid gap-3">
              {SUPPORTED_TRIGGERS.map(({ id, title, icon: Icon, description }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTrigger(id)}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTrigger === id
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedTrigger === id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timer Config */}
          {selectedTrigger === "timer" && (
            <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                Interval (seconds)
              </label>
              <Input
                type="number"
                placeholder="e.g., 60"
                value={metadata.time ?? ""}
                onChange={(e) => setMetadata((prev) => ({ ...prev, time: e.target.value }))}
                className="bg-white border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-600">
                Workflow will execute every {metadata.time || "X"} seconds
              </p>
            </div>
          )}

          {/* Price Trigger Config */}
          {selectedTrigger === "price-trigger" && (
            <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <TrendingUp size={16} className="text-purple-600" />
                  Asset
                </label>
                <Select
                  value={metadata.asset}
                  onValueChange={(value) => setMetadata((prev) => ({ ...prev, asset: value }))}
                >
                  <SelectTrigger className="bg-white border-purple-200">
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

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Target Price (USD)</label>
                <Input
                  type="number"
                  placeholder="e.g., 50000"
                  value={metadata.price ?? ""}
                  onChange={(e) => setMetadata((prev) => ({ ...prev, price: e.target.value }))}
                  className="bg-white border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger, metadata);
              setOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
            disabled={
              (selectedTrigger === "timer" && !metadata.time) ||
              (selectedTrigger === "price-trigger" && (!metadata.asset || !metadata.price))
            }
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};