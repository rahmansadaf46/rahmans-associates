"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  value: string;
  label?: string;
};

export function CopyButton({ value, label = "Copy" }: CopyButtonProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(t("common.copiedToClipboard"));
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(t("common.clipboardFailed"));
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? t("common.copied") : label}
    </Button>
  );
}
